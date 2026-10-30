import { useState } from 'react'



function Compteur() {
 const [Compteur, setCompteur] = useState (0)

  return (
    <>
<section id="center">
    <button type = "button"
    className='counter'
    onClick={function () {setCompteur (function (compteur) {return compteur+1});}
    } >
        incrémenter
    </button>
    <button type = "button"
    className='counter'
    onClick={function () {setCompteur (function (compteur) {return compteur-1});}}>
        Décrémenter
    </button>
    {Compteur}
    </section>
    </>
  )
}

export default Compteur