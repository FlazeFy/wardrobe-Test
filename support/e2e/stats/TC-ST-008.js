// Components
import { generateMonthName } from '../../components/generate'
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-008 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Stats Of Total Used Outfit per Month', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')

            // Step 3: Find section "Monthly Used", the line chart should formated for each month data ploting
            cy.get(`#total_used_outfit_per_month_stats-section`).contains('Monthly Used')
            cy.get('#total_used_outfit_per_month_stats-section').within(() => {
                cy.get('.apexcharts-canvas').should('exist')
                cy.get('.apexcharts-legend').should('exist')
                const monthsName = generateMonthName('all','short')
                cy.get('.apexcharts-xaxis-label title').each(($el, idx) => {
                    cy.wrap($el).invoke('text').should('eq', monthsName[idx])
                })    
            });
           
            // Evidence - Step 3
            cy.screenshot(`TC-ST-008_Step-3-${date}`)
        })
    })
})
