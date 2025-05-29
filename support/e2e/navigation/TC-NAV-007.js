// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-007 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Open Clothes Detail From Stats Most Used Clothes Daily per Clothes Type', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: In the section "Most Used Clothes Daily per Clothes Type", find clothes by opening a day section
            cy.get('#most_used_clothes_daily_per_clothes_type-section').should('exist').within(() => {
                cy.contains("h2","Most Used Clothes Daily per Clothes Type")
                cy.screenshot(`TC-NAV-007_Step-2-${date}`)
                cy.get('.day_section-box').then($boxes => {
                    // Convert to array
                    const boxesArray = [...$boxes]
                    let found = false
            
                    const processNext = (idx) => {
                        if (idx >= boxesArray.length || found) {
                            return
                        }
                        const $el = boxesArray[idx]
            
                        // Collapse button
                        cy.wrap($el).find('h4').eq(0).click()
                        cy.wrap($el).find('.collapse .row').then($row => {
                            const noClothesText = $row.find('.fst-italic').text()?.trim() || ''
                            const hasClothes = $row.find('.box-clothes').length > 0
            
                            if (!noClothesText.includes('- No Clothes Has Used On This Day -') && hasClothes) {
                                found = true
                                // Step 3: Choose and open Clothes from the day section, it should be on Clothes Detail Page
                                cy.wrap($row).find('.box-clothes').first().click()
                                cy.url().should('include', '/clothes/detail')
                            } else {
                                processNext(idx + 1)
                            }
                        })
                    }
            
                    processNext(0)
                })
            })
            cy.screenshot(`TC-NAV-007_Step-3-${date}`)
        })
    })
})
