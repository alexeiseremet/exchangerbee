import React from 'react';

const WidgetToday = ({
  archiveQuote, centralBank, baseCurrenciesArr, baseCurrency,
}) => {
  if (!archiveQuote) {
    return null;
  }

  const getText = (quote) => ({
    name: quote[1].currencyVObj.name,
    bid: quote[1].bid,
    prevBid: quote[0].bid,
    t2: Math.abs(quote[1].bid - quote[0].bid).toFixed(4),
    t3: quote[1].bid > quote[0].bid,
  });

  const text = {};

  baseCurrenciesArr.forEach((value, i) => {
    text[`q${i}`] = getText(archiveQuote[i].quote);
  });

  return (
    <div className="today"
         dangerouslySetInnerHTML={{
           __html: `
          <p>
          Cursul de referinţă pentru <b>${text.q0.name}</b> anunțat de ${centralBank.name} valabil astăzi este de 
          <b>${text.q0.bid}</b>, în ${text.q0.t3 ? 'creștere' : 'scădere'} cu ${text.q0.t2} faţă de cotația de ieri (vineri). 
          ${text.q1.t2 === text.q0.t2 ? 'La fel și' : 'Iar'} <b>${text.q1.name}</b> în raport cu ${baseCurrency.name} 
          a ${text.q1.t3 ? 'crescut' : 'scăzut'} până la <b>${text.q1.bid}</b>, cu ${text.q1.t2} 
          mai ${text.q1.t3 ? 'mult' : 'puțin'} decât ziua precedentă.
          </p>
          
          <p>
          Tot azi, <b>${text.q2.name}</b> s-a ${text.q2.t3 ? 'apreciat' : 'depreciat'} în raport cu moneda națională și a ajuns la 
          <b>${text.q2.bid}</b>, față de ziua precedentă când a fost ${text.q2.prevBid}. 
          </p>
          
          <p>
          În ceea ce privește cursul pentru <b>${text.q3.name}</b> acesta a ${text.q2.t3 ? 'urcat' : 'coborât'} față de valoarea de 
          ieri (vineri), ajungând la <b>${text.q3.bid}</b>. Iar pentru <b>${text.q4.name}</b>, ${centralBank.name} a afișat 
          un curs de referință de <b>${text.q4.bid}</b>, cu ${text.q4.t2} mai ${text.q4.t3 ? 'mult' : 'puțin'} decât ieri (vineri).
          </p>
    `,
         }}/>
  );
};

export default WidgetToday;
