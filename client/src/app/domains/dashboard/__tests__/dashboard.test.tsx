import React from 'react'
import { Dashboard } from 'app/domains/dashboard/index'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe("Dashboard default view", () => {
    test("View should contain a title 'Dashboard'", () => {
        const { getByText } = render(<Dashboard />)
        expect(getByText("Dashboard")).toBeInTheDocument()
    })
})
