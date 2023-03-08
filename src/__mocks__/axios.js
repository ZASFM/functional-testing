//Conserving the whole implementation of react-router-dom apart from useParams, to mock the return id value
module.exports = {
   ...jest.requireActual('react-router-dom'),
   useParams: jest.fn()
}