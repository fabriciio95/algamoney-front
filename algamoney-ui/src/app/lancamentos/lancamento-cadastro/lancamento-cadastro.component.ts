import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

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
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
         .then(lancamento =>  this.lancamento = lancamento!)
         .catch(error => this.errorHandler.handle(error));
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
          this.toastyService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!'})

          form.reset();

          this.lancamento = new Lancamento();
    }).catch(error => this.errorHandler.handle(error));
  }


  carregarCategorias() {
    this.categoriaService.listarTodas()
       .then(categorias => {
            this.categorias = categorias.map((c: any) =>  ({ label: c.nome, value: c.codigo } ));
       }).catch(error => this.errorHandler.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
       .then(pessoas => {
           this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
       }).catch(error => this.errorHandler.handle(error));
  }

}
