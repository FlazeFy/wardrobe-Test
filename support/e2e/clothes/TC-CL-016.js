// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-016 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_name = 'Casual T-Shirt'

    it('User Can See No Data Message If There Is No Schedule Found On Specific Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: Find section "All Clothes", choose the clothes with name "Casual T-Shirt"
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').each($el => {
                const clothes_name_text = Cypress.$($el).find('h4').text().trim()

                if (clothes_name_text == clothes_name) {
                    cy.wrap($el).find('.btn-detail').click()
                    return false 
                }
            })

            // Step 3: In the Clothes Detail page, find "Schedule", and there will be a message "- No Schedule Found -"
            cy.url().should('include','/clothes/detail')
            cy.get('#schedule-section').should('exist').contains('Schedule')
            cy.get('#schedule-section').should('exist').contains('- No Schedule Found -')
            
            // Evidence - Step 3
            cy.screenshot(`TC-CL-016_Step-3-${date}`)
        })
    })
})
