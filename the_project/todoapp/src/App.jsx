import getFile from './service'

const App = () => {

  imageUrl = URL.createObjectURL(getFile())

  return(
  <div>
    <h1>The project App</h1>
    <img src={imageUrl} />
    <p>DevOps with Kubernetes</p>
    
  </div>
  )

}

export default App
