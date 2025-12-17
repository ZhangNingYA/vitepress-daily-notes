import DefaultTheme from 'vitepress/theme'
import type { Theme, EnhanceAppContext } from 'vitepress'
import './style.css'

// @ts-ignore
import HomePanels from './components/HomePanels.vue'
// @ts-ignore
import DailyHub from './components/DailyHub.vue'
// @ts-ignore
import DailyCategory from './components/DailyCategory.vue'
// @ts-ignore
import DailyArchive from './components/DailyArchive.vue'
// @ts-ignore
import FlashCard from './components/FlashCard.vue' 
// @ts-ignore
import GrammarCard from './components/GrammarCard.vue'
// @ts-ignore
import GrammarPlanet from './components/GrammarPlanet.vue'
// @ts-ignore
import SVO_Builder from './components/SVO_Builder.vue'
// @ts-ignore
import Modifier_FX from './components/Modifier_FX.vue'
export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('HomePanels', HomePanels)
    app.component('DailyHub', DailyHub)
    app.component('DailyCategory', DailyCategory)
    app.component('DailyArchive', DailyArchive)
    app.component('FlashCard', FlashCard)
    app.component('GrammarCard', GrammarCard)
    app.component('GrammarPlanet', GrammarPlanet)
    app.component('SVOBuilder', SVO_Builder)
    app.component('ModifierFX', Modifier_FX)
  }
} satisfies Theme
