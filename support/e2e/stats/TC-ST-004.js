// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-004 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Stats Of Clothes Monthly Activity', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: Find section "Clothes Monthly Activity". It should have chart and label of "Total Created" and "Total Buyed"
            cy.get(`#clothes_monthly_activity_stats-section`).contains('Clothes Monthly Activity')
            cy.get('#clothes_monthly_activity_stats-section').within(() => {
                cy.get('.apexcharts-canvas').should('exist')
                cy.get('.apexcharts-legend').should('exist')
            });   
            const labelChart = ['Total Created','Total Buyed']
            labelChart.forEach(dt => {
                cy.get(`#clothes_monthly_activity_stats-section`).contains(dt)
            })
            
            // Evidence - Step 2
            cy.screenshot(`TC-ST-004_Step-2-${date}`)
        })
    })
})
