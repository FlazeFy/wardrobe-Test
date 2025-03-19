// Components
import '../../components/template'

describe('Wardrobe Integration Test - Auth', () => {

    it('Get Sign Out', () => {
        const payload = {
            username : "flazefy",
            password: 'nopass123',
        }

        cy.templateE2ELoginAPI(payload.username, payload.password).then(token => {
            cy.request({
                method: 'get',
                url: `/api/v1/logout`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).as('GetSignOut')
            cy.get('@GetSignOut').then(dt => {
                cy.templateGet(200,dt, null)
                expect(dt.body.message).contain('logout success')
            })
        })
    })
})