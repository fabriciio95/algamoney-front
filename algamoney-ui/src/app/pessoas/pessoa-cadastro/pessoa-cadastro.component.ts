import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contato, Estado, Pessoa } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  implements OnInit{

  pessoa = new Pessoa();
  estados!: any[];
  estadoSelecionado!: any;
  cidades!: any;

  constructor(private pessoaService: PessoaService,
              private toastyService: MessageService,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit(): void {
      this.title.setTitle('Nova Pessoa');

      const codigoPessoa = this.activatedRoute.snapshot.params['codigo'];

      this.carregarEstados();

      if(codigoPessoa) {
        this.buscarPessoa(codigoPessoa);
      }
  }

  carregarEstados() {
    this.pessoaService.listarEstados()
      .then((estados: any) =>{
          this.estados = estados.map((uf: any) => ({ label: uf.nome, value: uf.codigo }));
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado)
      .then((response: any) => {
         this.cidades = response.map((c: any) => ({ label: c.nome, value: c.codigo}));

         if(this.estadoSelecionado !== this.pessoa.endereco.cidade.estado.codigo) {
            this.pessoa.endereco.cidade.codigo = undefined;
         }
      }).catch(error => this.errorHandler.handle(error));
  }


  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar() {
    if(this.editando) {
        this.atualizar();
    } else {
      this.adicionar();
    }
  }

  adicionar() {
    this.pessoaService.adicionar(this.pessoa)
        .then((pessoa) => {
            this.toastyService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso!'});

            this.pessoa = pessoa!;

            this.router.navigate(['/pessoas', this.pessoa.codigo]);
        }).catch(error => this.errorHandler.handle(error));
  }

  atualizar() {
    this.pessoaService.atualizar(this.pessoa)
       .then(pessoa => {
            this.toastyService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });

            this.pessoa = pessoa!;

            this.atualizarTituloPagina();
       }).catch(erro => this.errorHandler.handle(erro));
  }

  buscarPessoa(codigo: number) {
     this.pessoaService.buscarPessoa(codigo)
         .then(pessoa => {
           this.pessoa = pessoa!

           this.estadoSelecionado = this.pessoa.endereco.cidade ? this.pessoa.endereco.cidade.estado.codigo : null;

           if(this.estadoSelecionado) {
              this.carregarCidades();
           }

           this.atualizarTituloPagina();
         }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloPagina() {
     this.title.setTitle('Edição de pessoa: ' + this.pessoa.nome)
  }

  nova(ngForm: NgForm) {
    ngForm.reset();

    setInterval(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['/pessoas/nova']);
  }
}
