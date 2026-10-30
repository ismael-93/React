import styles from "./Sidebardroite.module.css"


function Sidebardroite() {

  return (
    <aside className={styles.rightColumn}>
      <h2>Panier</h2>
      <p>2 articles</p>
      <p>Total : 74 €</p>
      </aside>
  )
}

export default Sidebardroite