import primaryTheme from './primaryTheme';
import primaryThemeDark from './primaryThemeDark';
const themes={
    primaryTheme,
    primaryThemeDark
}

export default function getTheme(theme){
    return themes[theme]
}