import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
  })
};

interface Info {
  idPersona : number;
  documento : number;
  nombres : string;
  apellidos : string;
  telefono : string;
  correo : string;
  direccion : string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  infos: any;
  editInfo: Info = {} as Info;
  removeInfo: Info = {} as Info;

  constructor (private http: HttpClient) {}

  fecthInfo() {
    this.http.get<Info>('http://190.60.101.59:6003/api/Personas/1', httpOptions).
    subscribe( info => {
      this.infos = info
    }, error => {
      console.error('Error', error);
    });
  }
  postInfo() {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }); 
    this.http.post('http://190.60.101.59:6003/api/Personas', this.editInfo, { headers }).subscribe( response => { console.log('Respuesta:', response); }, error => { console.error('Error:', error); })
  }

  updateInfo() {
    this.http.put<Info>('http://190.60.101.59:6003/api/Personas/${this.editInfo.idPersona}', this.editInfo, httpOptions).
    subscribe( updatedinfo => {
      this.infos = updatedinfo
    }, error => {
      console.error('Error', error);
    });
  }

  deleteInfo() {
    this.http.delete<Info>('http://190.60.101.59:6003/api/Personas/${this.editInfo.idPersona}', httpOptions).
    subscribe(() => {
      this.infos = this.infos.filter((deleted:any) => deleted.idPersona == this.removeInfo.idPersona)
    }, error => {
      console.error('Error', error);
    });
  }

}
