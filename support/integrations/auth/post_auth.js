// Components
import '../../components/template'

describe('Wardrobe Integration Test - Auth', () => {
    const method = 'post'

    it('Post Login', () => {
        const payload = {
            username : "flazefy",
            password : 'nopass123',
        }

        cy.request({
            method: method,
            url: '/api/v1/login',
            body: payload
        }).as('PostLogin')
        cy.get('@PostLogin').then(dt => {
            expect(dt.status).to.equal(200)

            const body = dt.body
            const objectBody = ['token','role','result']
            objectBody.forEach(dt => {
                expect(body).to.have.property(dt)
            })
            expect(body['token']).to.be.a('string')
            expect(body['role']).to.be.a('number')
            expect(body['result']).to.be.a('object')

            // Get list key / column
            const dataObj = body['result']
            const stringFields = ['id','username','email','created_at']
            const stringNullableFields = ['updated_at']

            // Validate column
            cy.templateValidateColumn(dataObj, stringFields, 'string', false)
            cy.templateValidateColumn(dataObj, stringNullableFields, 'string', true)

            // Validate character length
            const columnPropsClothes = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'username', data_type: 'string', max: 36, min: 6, nullable: false },
                { column_name : 'email', data_type: 'string', max: 144, min: 10, nullable: false },
            ]
            cy.templateValidateMaxMin(dataObj, columnPropsClothes)

            // Validate datetime
            const columnDateTime = [
                { column_name : 'created_at', date_type: 'datetime', nullable: false },
                { column_name : 'updated_at', date_type: 'datetime', nullable: true },
            ]
            cy.templateValidateDateTime(dataObj, columnDateTime)
        })
    })
})