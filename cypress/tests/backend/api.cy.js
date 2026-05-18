const apiUrl = Cypress.env('apiUrl')

describe('ServeRest API', () => {
  context('POST /login', () => {
    it('should authenticate a valid user and return a Bearer token', () => {
      cy.fixture('users').then(({ valid }) => {
        cy.request({
          method: 'POST',
          url: `${apiUrl}/login`,
          body: {
            email: valid.email,
            password: Cypress.env('userPassword'),
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', 'Login realizado com sucesso')
          expect(response.body.authorization).to.match(/^Bearer\s.+/)
        })
      })
    })
  })

  context('POST /usuarios', () => {
    it('should create a new user and return the generated ID', () => {
      cy.fixture('users').then(({ new: newUser }) => {
        const uniqueEmail = `cypress_${Date.now()}@qa.com`

        cy.request({
          method: 'POST',
          url: `${apiUrl}/usuarios`,
          body: {
            nome: newUser.name,
            email: uniqueEmail,
            password: Cypress.env('userPassword'),
            administrador: newUser.administrador,
          },
        }).then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
          expect(response.body).to.have.property('_id').and.be.a('string')
        })
      })
    })
  })

  context('GET /usuarios', () => {
    it('should return a list of users with the expected response structure', () => {
      cy.request(`${apiUrl}/usuarios`).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade').and.be.a('number')
        expect(response.body).to.have.property('usuarios').and.be.an('array')
        expect(response.body.usuarios).to.have.length(response.body.quantidade)
      })
    })
  })
})
