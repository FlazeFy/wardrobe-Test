// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-004 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Clothes Calendar per Month', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Calendar"
            cy.get('.navbar').contains('a', 'Calendar').click()
            cy.url().should('include', '/calendar')
                        
            // Step 2: In the table, there is a date column and every clothes list for used history, weekly and wash schedule, buyed history, and add to wardrobe history.
            // The list clothes contain image, clothes name, type and category
            const expected_header = ['Date','Used History','Weekly Schedule','Wash Schedule','Buyed History','Add to Wardrobe','Manage']
            cy.get('#calendar-table thead th').each(($th, idx) => {
                cy.wrap($th).invoke('text').then((text) => {
                    expect(text.trim()).to.equal(expected_header[idx])
                })
            })
            cy.get('#calendar-table tbody tr').each(($tr) => {
                // Date Column
                cy.wrap($tr).find('td').first().invoke('text').then((text) => {
                    const dateRegex = /^\d{2} [A-Za-z]{3} \d{4}$/ // Format: dd Mon YYYY
                    expect(text.trim()).to.match(dateRegex)
                })
                // Others Column
                for (let i = 1; i <= 5; i++) {
                    cy.wrap($tr).find('td').eq(i).within(() => {
                        cy.get('.row').should('exist').then(($row) => {
                            // Check if the column has clothes
                            if ($row.children().length > 0) {
                                cy.get('.box-clothes').should('exist').within(() => {
                                    // Clothes Image
                                    cy.get('img.img-clothes').should('have.attr', 'src').and('not.be.empty')
                                    // Clothes Name
                                    cy.get('h4').invoke('text').should('not.be.empty')
                                    // Clothes Category & Type
                                    cy.get('h6').invoke('text').should('match', /^[A-Za-z\s]+ \| [A-Za-z\s]+$/) 
                                })
                            }
                        })
                    })
                }
                // Manage Column
                cy.wrap($tr).find('td').last().within(() => {
                    cy.get('button svg').should('have.length', 2)
                    cy.get('button').first().should('have.class', 'btn-warning')
                    cy.get('button').last().should('have.class', 'btn-primary')
                })
            })

            // Evidence - Step 2
            cy.screenshot(`TC-CL-004_Step-2-${date}`)
        })
    })
})
