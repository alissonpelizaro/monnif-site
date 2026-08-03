---
title: "Três meses de histórico em cinco minutos"
description: "Como usar o extrato do banco para começar com dados reais — sem digitar lançamento por lançamento e sem entregar sua senha bancária a ninguém."
date: 2026-07-07
tag: "Guia do app"
capa: "https://images.unsplash.com/photo-1753955900083-b62ee8d97805?auto=format&fit=crop&w=1600&h=900&q=70"
---

O maior obstáculo para começar a controlar as finanças não é escolher o app. É o vazio
inicial: uma tela em branco que só fica útil depois de semanas de digitação.

Dá para pular essa parte. O seu banco já tem tudo o que falta.

## Por que arquivo e não conexão automática

O Monnif **não se conecta ao seu banco** e nunca pede a sua senha bancária. A conexão
automática, do jeito que muitos apps fazem, depende de você entregar a credencial de
acesso à sua conta para um terceiro. É conveniente, e é um risco que decidimos não pedir
que você corra.

O caminho aqui é o arquivo: você baixa o extrato no site do próprio banco, logado como
sempre, e envia para o Monnif. Leva um minuto a mais e não cria uma cópia da sua senha
em lugar nenhum.

## Passo a passo

**1. Baixe o extrato.** Procure por "extrato", "exportar" ou "baixar" no app ou site do
banco. Prefira **OFX** — é o formato padrão de extrato bancário e já vem com data,
valor e descrição bem definidos. **CSV** também funciona, desde que tenha colunas de
data e valor. Quase todo banco brasileiro oferece um dos dois.

Se puder escolher o período, pegue três meses. É o suficiente para o histórico ter
padrão, e ainda pequeno o bastante para conferir sem cansar.

**2. Envie e confira a prévia.** Nada é gravado ainda. O Monnif mostra cada linha lida:
o que entendeu de data, valor e descrição, e para qual categoria pretende mandar.

**3. Ajuste.** Corrija categorias e tire linhas que não deveriam entrar. É aqui que
vale investir cinco minutos — cada correção vira aprendizado para as próximas
importações.

**4. Confirme.** Só agora os lançamentos passam a existir.

## O que acontece se algo der errado

**Arquivo errado, mês errado, conta errada.** O botão **Desfazer** reverte a importação
inteira de uma vez. Não é linha por linha: é a leva toda, como se nunca tivesse
acontecido.

**Lançamento duplicado.** Se você já tinha registrado o aluguel como previsto e ele
aparece no extrato, o Monnif reconhece o par em vez de criar uma segunda linha.
Duplicadas prováveis vêm sinalizadas na prévia para você decidir.

## A parte que se paga depois

Cada vez que você categoriza um lançamento, o Monnif guarda a associação entre um
trecho da descrição e a categoria escolhida. Repetiu algumas vezes, vira regra.

O formato é literal e visível — `contém "aluguel" → Moradia` — numa tela onde você pode
ver e apagar cada uma. Sem caixa-preta, sem "o algoritmo decidiu".

O efeito aparece na segunda importação: a prévia chega quase toda categorizada, e o que
levou cinco minutos passa a levar trinta segundos. Num arquivo com dezenas de linhas,
é a diferença entre manter o hábito e abandonar.

## Depois de importar

Com três meses dentro, os [relatórios](/docs/planejamento/relatorios/) passam a ter
base — média por categoria, evolução mês a mês —, e a tela de
[assinaturas](/docs/planejamento/assinaturas/) começa a detectar as cobranças que se
repetem. Nenhuma das duas diz nada útil numa conta vazia.

Detalhes de cada passo estão em [Importar extrato](/docs/dados/importar/) e
[Categorização automática](/docs/dados/automacao/).
