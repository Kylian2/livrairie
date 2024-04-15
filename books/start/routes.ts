/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import auth from '@adonisjs/auth/services/main'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
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
router.get('books/:id', [Book, 'show']).use(middleware.auth())
