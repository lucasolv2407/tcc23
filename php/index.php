<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Cálculo de Raízes Quadrada e Cúbica</title>
  <link rel="stylesheet" href="Estilos.css" />
</head>
<body>
  <div class="container">
    <div class="card" aria-labelledby="titulo">
      <h1 id="titulo">Cálculo de Raízes<br>Quadrada e Cúbica</h1>
      <p class="subtitle">Digite um número e veja a raiz quadrada e a raiz cúbica calculadas.</p>
      <label for="numero">Digite um número:</label>
      <input id="numero" type="number" step="any" value="64">
      <button id="calcular" class="btn">Calcular Raízes</button>
      <div id="resultado" class="result-box" hidden>
        <div class="result-title">Resultado Final</div>
        <p style="margin:6px 0;color:#6b6b6b">Analisando o número <strong id="num-analisado">0</strong> temos:</p>
        <div class="result-line"><span class="bullet">•</span> A raiz quadrada é <strong id="raiz-quad"></strong></div>
        <div class="result-line"><span class="bullet">•</span> A raiz cúbica é <strong id="raiz-cub"></strong></div>
      </div>
      <div id="erro" style="color:#fff;background:#a83a3a;padding:10px;border-radius:8px;margin-top:12px;display:none"></div>
    </div>
  </div>
  <script>
    const inNumero = document.getElementById('numero');
    const btn = document.getElementById('calcular');
    const resultado = document.getElementById('resultado');
    const erro = document.getElementById('erro');
    const numAnalisado = document.getElementById('num-analisado');
    const raizQuadEl = document.getElementById('raiz-quad');
    const raizCubEl = document.getElementById('raiz-cub');
    const fmt = new Intl.NumberFormat('pt-BR', {minimumFractionDigits:3, maximumFractionDigits:3});
    function calcular(){
      erro.style.display='none';
      const raw = inNumero.value.trim();
      if(raw === ''){
        erro.textContent = 'Por favor, digite um número.';
        erro.style.display = 'block';
        resultado.hidden = true;
        return;
      }
      const n = Number(raw);
      if(!isFinite(n)){
        erro.textContent = 'Valor numérico inválido.';
        erro.style.display = 'block';
        resultado.hidden = true;
        return;
      }
      let raizQuad = null;
      if(n < 0){
        raizQuad = 'não definida (número real)';
      } else {
        raizQuad = fmt.format(Math.sqrt(n));
      }
      const raizCub = fmt.format(Math.cbrt(n));
      numAnalisado.textContent = n.toString().replace('.',',');
      raizQuadEl.textContent = raizQuad;
      raizCubEl.textContent = raizCub;
      resultado.hidden = false;
    }
    btn.addEventListener('click', calcular);
    inNumero.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') calcular(); });
  </script>
</body>
</html>
