const jwtMiddleware = store => next => action => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
    next(action);
  }
  
  export default jwtMiddleware;