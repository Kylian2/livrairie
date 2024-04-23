/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'auth-adonis-6',
  }
})

const Auth = () => import('#controllers/auth_controller')

router.post('login', [Auth, 'connexion'])
router.post('register', [Auth, 'inscription'])
router.post('logout', [Auth, 'deconnexion']).use(middleware.auth())
router.get('islogged', [Auth, 'checklogged'])

router
  .get('/home', async () => {
    return 'protected'
  })
  .middleware(middleware.auth())

const Book = () => import('#controllers/books_controller')

router.get('books', [Book, 'index']).use(middleware.auth())
router.get('books/categorie/:categorie', [Book, 'indexByCategory']).use(middleware.auth())
router.get('books/:id', [Book, 'show']).use(middleware.auth())
router.post('books/ajout', [Book, 'store']).use(middleware.auth())
router.post('books/:id/destroy', [Book, 'destroy']).use(middleware.auth())

const Category = () => import('#controllers/categories_controller')

router.get('categories', [Category, 'index'])
router.get('categories/user', [Category, 'indexByUser']).use(middleware.auth())
