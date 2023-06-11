import userEndpoint from './user.endpoint';
import noteEndpoint from './note.endpoint';

const routes = function (router) {
    userEndpoint(router);
    noteEndpoint(router);
};

export default routes;
