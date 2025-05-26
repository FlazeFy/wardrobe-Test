// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-001 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Clothes Schedule Reminder', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')
            
            // Step 2: In the Box with Title "Information" that contain description "Don't forget, This clothes is set to wear today!" must have today's day. And list of clothes must contain clothes name, image, and type
            const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
            cy.get('#schedule_reminder-section').should('exist').contains("Don't forget, This clothes is set to wear today!")
            cy.get('#schedule_reminder-section').should('exist').contains(`Today is ${today}`)

            cy.get('#schedule_reminder-section .row').find('.col-lg-3.col-md-4.col-sm-6.col-6').should('exist').each((el,idx) => {
                if(idx > 0){
                    cy.wrap(el).find('.box-schedule-mini').should('exist').within(() => {
                        cy.get('h4').should('not.be.empty')
                        cy.get('p').should('not.be.empty')
                    })
                }
            })

            // Evidence - Step 2
            cy.screenshot(`TC-CL-001_Step-2-${date}`)
        })
    })
})
