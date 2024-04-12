import React ,{useState, useEffect} from 'react';
import './App.css';

function Cronometro(){
  const[tempo, setTempo]= useState(0)
  const[isRodando, setIsRodando]= useState(false)

  useEffect(() => {
    let intervalo;

    if(isRodando){
      intervalo = setInterval(()=>{
        setTempo(tempo => tempo + 1) //atualiza o cronometro de 1s
      }, 10); // atualiza a cada 10 milesegundos
    } else{
      clearInterval(intervalo)
    }

    return() => clearInterval(intervalo);
  },[isRodando]) //dependencia do useEffect,
  //ele irá executar caso o "isRodando" mude de valor

  const formatarTempo=(tempo) => {
    const horas = Math.floor( tempo / 360000);
    //quantidade de segundos em uma hora
    //floor arredonda para baixo

    const minutos= Math.floor( (tempo % 360000) / 6000);
    const segundos= Math.floor( (tempo % 6000) / 100);
    const milesegundos= tempo % 100;

    return `
    ${horas.toString().padStart(2, '0')}:
    ${minutos.toString().padStart(2, '0')}: 
    ${segundos.toString().padStart(2, '0')}:
    ${milesegundos.toString().padStart(2, '0')}:
    `
    //(``) tanto string quanto variável
    //padStart preenche "2" as casas à esquerda com "0" caso não tenha nenhum valor ali

  }

  const handleComecar= () => {
    setIsRodando(true)
    /*quando eu chamar a função "handleComecar", vai trocar o booleando do setIsRodando para true*/
  }

  const handlePausar= () => {
    setIsRodando(false)
    /*quando eu chamar a função "handlePausar", vai trocar o booleando do setIsRodando para false*/
  }

  const handleReiniciar= () => {
    setIsRodando(false)
    setTempo(0)
    /*quando eu chamar a função "handleReiniciar", vai trocar o booleando do setIsRodando para false e também bai zerar a variavel "setTempo"*/
  }

  return(
    <div className='cronometro-container'>
      <h1>Cronometro ⏱</h1>
      <p className='tempo'>{formatarTempo(tempo)}</p>

      <div className='botoes-container'>
        <button onClick={handleComecar}>Começar</button>
        <button onClick={handlePausar}>Pausar</button>
        <button onClick={handleReiniciar}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Cronometro;
