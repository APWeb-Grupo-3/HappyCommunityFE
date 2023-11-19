import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Detalle } from 'src/app/models/detalle';
import { DetalleService } from 'src/app/services/detalle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-dialog',
  templateUrl: './detalle-dialog.component.html',
  styleUrls: ['./detalle-dialog.component.css']
})
export class DetalleDialogComponent implements OnInit{
  dataSource: MatTableDataSource<Detalle> = new MatTableDataSource();
  id:number=0;
  displayedColumns: string[] = [
    'codigo',
    'subtotal',
    'documentopago',
    'servicio',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dS: DetalleService, private matDialog:MatDialog,private route:ActivatedRoute,
    private dialogRef: MatDialogRef<DetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) {}
  ngOnInit(): void {

    if(this.data&&this.data.id){
      this.id=this.data.id
      this.dS.listDDoc(this.id).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    }
  
  }

}
