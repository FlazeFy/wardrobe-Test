// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-005 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Open Clothes Detail From Clothes Calendar', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Calendar"
            cy.get('.navbar').contains('a', 'Calendar').click()
            cy.url().should('include', '/calendar')

            // Step 2: In the table, there is a date column and every clothes list for used history, weekly and wash schedule, buyed history, and add to wardrobe history.
            const expected_header = ['Date','Used History','Weekly Schedule','Wash Schedule','Buyed History','Add to Wardrobe','Manage']
            cy.get('#calendar-table thead th').each(($th, idx) => {
                cy.wrap($th).invoke('text').then((text) => {
                    expect(text.trim()).to.equal(expected_header[idx])
                })
            })

            // Step 3: Choose and open Clothes from table, it should be on Clothes Detail Page
            cy.get('#calendar-table tbody tr .box-clothes').should('exist').first().click()
            cy.url().should('include','/clothes/detail')
            cy.screenshot(`TC-NAV-005_Step-3-${date}`)
        })
    })
})
