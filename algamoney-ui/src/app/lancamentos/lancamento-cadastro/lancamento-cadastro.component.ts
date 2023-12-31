import { Title } from '@angular/platform-browser';
import { Lancamento } from './../../core/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';

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
  uploadEmAndamento = false;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

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
        descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5, 'descricao') ]],
        valor: [null, Validators.required],
        pessoa: this.formBuilder.group({
          codigo: [null, Validators.required],
          nome: []
        }),
        categoria: this.formBuilder.group({
          codigo: [null, Validators.required],
          nome: []
        }),
        observacao: [],
        anexo: [],
        urlAnexo: []
      });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null :  { obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number, formControlName: string) {
    return (input: FormControl) => {
        return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor, valorAtual: this.formulario.get(formControlName)?.value.length }}
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')?.value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
         .then(lancamento =>  {

         this.formulario.patchValue(lancamento!)

         if(this.formulario.get('urlAnexo')?.value) {
          this.formulario.patchValue({
              urlAnexo: this.formulario.get('urlAnexo')?.value.replace('\\\\', 'https://')
          });
         }

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

  antesUploadAnexo() {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event: any) {
      const anexo = event.originalEvent.body;

      this.formulario.patchValue({
          anexo: anexo.nome,
          urlAnexo: anexo.url.replace('\\\\', 'https://')
      });

      this.uploadEmAndamento = false;
  }

  erroUpload(event: any) {
      this.toastyService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo'});
      this.uploadEmAndamento = false;

      if(this.fileUpload) {
        this.fileUpload.clear();
      }
  }

  removerAnexo() {
    this.formulario.patchValue({
        anexo: null,
        urlAnexo: null
    });
  }

  get nomeAnexo() {
    const nome =  this.formulario.get('anexo')?.value;

    if(nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }

    return '';
  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }
}
