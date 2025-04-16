// Components
import { generateMonthName } from '../../components/generate'
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-002 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Monthly Used Stats For Specific Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-002_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').first().click()

            // Step 4: In the specific Outfit Detail Page, Find section "Monthly Used", the line chart should formated for each month data 
            cy.url().should('include','clothes/outfit')
            cy.get(`#total_used_outfit_per_month_stats-section`).contains('Monthly Used')
            cy.get('#total_used_outfit_per_month_stats-section').within(() => {
                cy.get('.apexcharts-canvas').should('exist')
                cy.get('.apexcharts-legend').should('exist')
                const monthsName = generateMonthName('all','short')
                cy.get('.apexcharts-xaxis-label title').each(($el, idx) => {
                    cy.wrap($el).invoke('text').should('eq', monthsName[idx])
                })    
            });

            // Evidence - Step 4
            cy.screenshot(`TC-OF-002_Step-4-${date}`)
        })
    })
})
