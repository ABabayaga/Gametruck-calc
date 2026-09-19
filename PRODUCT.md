# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gestores e donos de frotas de caminhões (transportadoras) no Brasil. Chegam à calculadora avaliando se vale a pena conversar com a Game Truck: querem ver, com os números da própria operação, quanto dinheiro uma melhora de eficiência de combustível representa. O diesel é o maior custo variável que eles controlam só parcialmente.

## Product Purpose

Calculadora de impacto que funciona como porta de entrada comercial (geração de leads) da Game Truck. O gestor informa quantidade de veículos, km por veículo/mês, média de consumo (km/l) e preço do diesel; a calculadora mostra gasto mensal/anual com diesel e a economia de 3% de eficiência em reais e litros. Sucesso = o gestor enxerga um valor anual relevante para a própria frota e deixa seus dados para receber contato/relatório.

## Positioning

A Game Truck é uma plataforma de "Inteligência Comportamental Operacional": muda o comportamento dos motoristas por meio de gamificação (rankings, metas, recompensas) alimentada por dados de telemetria. A economia vem do comportamento do motorista, não de trocar veículo, combustível ou equipamento — por isso é uma alavanca que o gestor controla mesmo com o preço do diesel fora do seu controle.

## Operating Context

- Uso individual, provavelmente em desktop no escritório e também no celular; sem login.
- Entradas em formato brasileiro (`10.000`, `2,5`, `R$ 7,00`); valores em reais sem centavos.
- Fluxo atual: formulário (etapa 01) → resultado (etapa 02). A etapa seguinte será captura de lead.

## Capabilities and Constraints

- Fórmula: litros/mês = veículos × km ÷ km/l; custo = litros × preço; economia = custo × 3%. Nenhum dado pessoal é pedido antes do resultado (promessa explícita na interface).
- SPA estática (React + Vite + Tailwind v4), sem backend.
- **Decidido:** após o resultado, capturar o lead em formulário (dados de contato/empresa) para envio do relatório/contato comercial.
- **Em aberto:** destino do lead (CRM, e-mail, planilha, webhook ou WhatsApp) e quais campos pedir.

## Brand Commitments

- Nome: Game Truck. Assinatura: "Inteligência Comportamental Operacional".
- Logos em `public/LogoGameTruck.png` (fundo claro) e `public/Logo-Game-Truck-Branca.png` (fundo escuro).
- Toda a interface em português do Brasil.

## Evidence on Hand

- O ganho de 3% é a média observada em clientes reais da Game Truck e pode ser apresentado como resultado de clientes.
- Não há depoimentos, logos de clientes, cases publicados nem números adicionais no projeto — não inventar.

## Product Principles

1. Os números do próprio gestor são o argumento: o resultado precisa ser imediato, legível e crível.
2. Honestidade sobre o cálculo: deixar claro que é estimativa com base nos dados informados e nos 3% observados em clientes.
3. Valor antes de pedir dados: nada de contato é solicitado antes de mostrar o resultado.
4. Linguagem de operação de frota (km/l, diesel, veículos), direta e sem jargão de marketing.
