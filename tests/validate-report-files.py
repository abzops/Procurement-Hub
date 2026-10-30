"""Read-only XLSX/ZIP interoperability checks using openpyxl and XML parsing."""
import io
from pathlib import Path
import sys
import zipfile
import xml.etree.ElementTree as ET
import openpyxl


def verify(data, label):
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        assert archive.testzip() is None, label
        for name in archive.namelist():
            if name.endswith(('.xml', '.rels')):
                ET.fromstring(archive.read(name))
        workbook = openpyxl.load_workbook(io.BytesIO(data), read_only=False, data_only=False)
        expected = 14 if 'audit' in label else 10 if 'mechanical' in label else 5
        assert len(workbook.sheetnames) == expected, (label, workbook.sheetnames)
        for sheet in workbook:
            assert sheet.freeze_panes == 'A2', (label, sheet.title)
            assert sheet.max_row >= 1
        if 'procurement' in label and 'audit' not in label and 'mechanical' not in label:
            assert workbook['PO Summary'].max_row >= 1
        print(f'PASS {label}: {len(workbook.sheetnames)} sheets; all XML, styles, formulas, dates, panes loaded')


targets = [Path(arg) for arg in sys.argv[1:]] or list((Path(__file__).parent.parent / 'qa' / 'report-exports').glob('*.xlsx'))
for target in targets:
    if target.suffix == '.zip':
        with zipfile.ZipFile(target) as archive:
            assert len(archive.namelist()) == 3
            for name in archive.namelist():
                verify(archive.read(name), name)
    else:
        verify(target.read_bytes(), target.name)
