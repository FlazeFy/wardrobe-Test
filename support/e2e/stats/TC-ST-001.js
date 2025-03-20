// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-001 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Stats Of Most Used Clothes By Its Context', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: Find section "Most Used Clothes". It should have chart with title "By Its Merk", "By Its Size", "By Its Type", "By Its Made From", and "By Its Category"
            cy.get(`#most_used_clothes_stats-section`).contains('Most Used Clothes')
            const listChart = ["By Its Merk", "By Its Size", "By Its Made From", "By Its Type", "By Its Category"] 
            listChart.forEach((dt,idx) => {
                cy.get('#most_used_clothes_stats-section .card').contains(dt)
                cy.get('#most_used_clothes_stats-section .card').eq(idx).within(() => {
                    cy.get('.apexcharts-canvas').should('exist')
                    cy.get('.apexcharts-legend').should('exist')
                });            
            })
            
            // Evidence - Step 2
            cy.screenshot(`TC-ST-001_Step-2-${date}`)
        })
    })
})
