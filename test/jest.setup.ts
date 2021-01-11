import 'jest-styled-components'
import '@testing-library/jest-dom/extend-expect'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

library.add(far, fab, fad)
