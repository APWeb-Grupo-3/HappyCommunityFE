import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DocumentopagoService } from 'src/app/services/documentopago.service';
import { LoginService } from 'src/app/services/login.service';



import { ExportService } from 'src/app/services/export.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-reportemesdeuda',
  templateUrl: './reportemesdeuda.component.html',
  styleUrls: ['./reportemesdeuda.component.css']
})
export class ReportemesdeudaComponent {
  barChartOptions: ChartOptions = {
    responsive: true,


  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private dS: DocumentopagoService,
    private lS: LoginService,
    private exportService: ExportService

    ) {}
  ngOnInit(): void {
    this.dS.Deudames(this.lS.showUsername()).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.mes);
      this.barChartData=[
        {
          data:data.map(item=>item.total),
          label:'Cantidad de total de deuda en soles',
          backgroundColor: [
            'rgba(140, 174, 182)',
            'rgba(20, 62, 75)',
            'rgba(10, 70, 56)',
          ]
        }
      ]
    });
  }

  fileName="ExcelSheet.xlsx";
  exportarExcel(){
    let data=document.getElementById("table-data");
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)
  
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1')
  
    XLSX.writeFile(wb,this.fileName)
  }
  
  exportToExcel(): void {
    if (this.barChartLabels.length > 0 && this.barChartData.length > 0) {
      const excelData = this.barChartLabels.map((label, index) => ({
        Mes: label,
        'Cantidad de deuda': this.barChartData[0].data[index],
      }));
  
      this.exportService.exportToExcel(excelData, 'Reporte 4');
    }
  }
}
