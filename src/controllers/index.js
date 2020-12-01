const IndexController = {};

function Index(req, res) {
  const response = {
    message: 'Minutas Factory REST-API',
    version: '1.0.0',
  };
  res.send(response);
}

function Terms(req, res) {
  const response = {
    header: 'Términos y condiciones de Minutas Factory &copy',
    message: 'Acá van a ir los Términos y condiciones, los pondré cuando Carlitus los haga :v\n\n' + 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tenetur saepe repellat, fugiat perferendis temporibus quisquam mollitia optio blanditiis unde\n'+
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nisi dolor at beatae, impedit, quis odit vel id omnis laborum repudiandae asperiores harum quae nobis vero tempore recusandae mollitia earum dolores? Sequi est quod at, earum nemo quaerat doloremque optio, explicabo cupiditate unde, voluptatibus voluptas numquam aperiam repudiandae quibusdam alias\n'+    
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt omnis nihil id facere nemo, molestias consequuntur delectus modi unde eligendi non error quam voluptatem accusamus commodi nam repellat totam. Eius!\n'+
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, aliquam quasi, autem laudantium maxime voluptatum, impedit labore maiores aperiam fuga nihil quia inventore omnis provident quis! Doloremque quo necessitatibus odio.\n'+
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, odit.'
  };
  res.send(response);
}

function NotFound(req, res, next) {
  const response = {
    message: 'Resource Not Found',
    error: 202
    //error: 404
  }
  res.send(response);
  next(error);
}

module.exports = {
  Index,
  Terms,
  NotFound
};
