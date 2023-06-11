import business from '../business/business.container';
import applicationException from '../service/applicationException';
import auth from '../middleware/auth';


const noteEndpoint = (router) => {
    router.post('/api/note', auth, async (request, response, next) => {
        try {
            let result = await business.getNoteManager().createNewOrUpdate(request.body);
            response.status(201).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.get('/api/notes', auth, async (request, response, next) => {
        try {
            const result = await business.getNoteManager().query();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


        router.get('/api/note/:id', auth, async (request, response, next) => {
            try {
                const id = request.params.id;
                const result = await business.getNoteManager().getById(id);
                response.status(200).send(result);
            } catch (error) {
                applicationException.errorHandler(error, response);
            }
        });

    router.delete('/api/note/:id', auth, async (request, response, next) => {
       try {
                       const id = request.params.id;
                       const result = await business.getNoteManager().removeById(id);
                       response.status(200).send(result);
                   } catch (error) {
                       applicationException.errorHandler(error, response);
                   }
    });


};

export default noteEndpoint;



