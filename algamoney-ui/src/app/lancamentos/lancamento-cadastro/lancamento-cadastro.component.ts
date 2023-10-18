import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [];

  pessoas = [
    { label: 'João da Silva', value: 4 },
    { label: 'Sebastião Souza', value: 9 },
    { label: 'Maria Abadia', value: 3 },
  ];

  constructor(private categoriaService: CategoriaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }


  carregarCategorias() {
    this.categoriaService.listarTodas()
       .then(categorias => {
            this.categorias = categorias.map((c: any) =>  ({ label: c.nome, value: c.codigo } ));
       }).catch(error => this.errorHandler.handle(error));
  }

}
