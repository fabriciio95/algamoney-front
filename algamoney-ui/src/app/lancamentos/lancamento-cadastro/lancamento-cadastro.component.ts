import { Title } from '@angular/platform-browser';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  //lancamento = new Lancamento();
  formulario!: FormGroup;

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toastyService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.configurarFormulario();

    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle("Novo Lançamento");

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
      this.formulario = this.formBuilder.group({
        codigo: [],
        tipo: ['RECEITA', Validators.required],
        dataVencimento: [null, Validators.required],
        dataPagamento: [],
        descricao: [null, [Validators.required, Validators.minLength(5)]],
        valor: [null, Validators.required],
        pessoa: this.formBuilder.group({
          codigo: [null, Validators.required],
          nome: []
        }),
        categoria: this.formBuilder.group({
          codigo: [null, Validators.required],
          nome: []
        }),
        observacao: []
      });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')?.value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
         .then(lancamento =>  {

         this.formulario.patchValue(lancamento!)

          this.atualizarTituloEdicao();
        })
         .catch(error => this.errorHandler.handle(error));
  }

  salvar() {
    if(this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then((lancamento) => {
          this.toastyService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!'})

          //form.reset();

         // this.lancamento = new Lancamento();

         this.router.navigate(['/lancamentos', lancamento?.codigo]);
    }).catch(error => this.errorHandler.handle(error));
  }

  atualizarLancamento() {
      this.lancamentoService.atualizar(this.formulario.value)
         .then((lancamento) => {

           this.formulario.patchValue(lancamento!);

           this.toastyService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });

           this.atualizarTituloEdicao();
         }).catch(erro => this.errorHandler.handle(erro));
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

  novo() {
    this.formulario.reset();

    this.formulario.patchValue(new Lancamento());

    this.router.navigate(['/lancamentos/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`);
  }
}
