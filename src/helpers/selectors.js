import { anneesCaption, programmesCaption, matieresCaption } from "../reference/database";

/* PROJETS DATA */
const getTitle = ({ nom }) => nom;
const getCode = ({ code_projet }) => code_projet;
const getDescription = ({ description }) => description;
const getCollab = ({ collab }) => collab;
const getMaterial = ({ matiere}) => matiere;
const getMaterialHeightPageProjets = ({ hauteur_page_projets_px }) => hauteur_page_projets_px;
const getMaterialHeightPageBDD = ({ hauteur_page_bdd_px }) => hauteur_page_bdd_px;
const getClassementPageProjets = ({ classement_page_projets }) => parseInt(classement_page_projets, 10);
const getDeliveryDate = ({ livraison_YYYY_MM_DD }) => new Date(livraison_YYYY_MM_DD);
const getEtat = ({ etat }) => `État: ${etat || '-'}`;
const getMission = ({ mission }) => `Mission: ${mission}`;
const getDeliveryDisplayed = (projet, long = false) => {
  const deliveryDate = getDeliveryDate(projet);
  const formattedDate = getDeliveryDate(projet).toLocaleString('fr', { month: long ? 'long' : 'short', year: 'numeric' });
  return Date.now() < deliveryDate.getTime()
  ? `Livré ${formattedDate}`
  : `Livraison ${formattedDate}`
}
const getMaterialImageSrcForProjetsPage = ({ nom_fichier_page_projets }) => encodeURIComponent(nom_fichier_page_projets);
const getMaterialImageSrcForBDDPage = ({ nom_fichier_page_projets }) => encodeURIComponent(nom_fichier_page_projets);
const getLocation = ({ ville, departement_nom, pays }) => `${ville}, ${departement_nom}, ${pays}`
const getSurface = ({ surface_m2 }) => surface_m2
const getPrix = ({ prix_eur }) => prix_eur ? prix_eur + ' €' : 'NC'

const getBDDValueCategory = (value) => value.split('-')[0]
const getBDDValueRank = (value) => parseInt(value.split('-')[1])
  const getYearBDDValue = ({ annee_page_bdd_YYYY }) =>  annee_page_bdd_YYYY
const getYear = (projet) => parseInt(getBDDValueCategory(getYearBDDValue(projet)), 10)
const getMaterialBDDValue = ({ matiere_page_bdd }) => matiere_page_bdd
const getMaterialCategory = (projet) => getBDDValueCategory(getMaterialBDDValue(projet))
const getProgrammeBDDValue = ({ programme }) => programme
const getProgrammeCategory = (projet) => getBDDValueCategory(getProgrammeBDDValue(projet))
const isProjetInCategory = (caption, category) => projet => {
  let categoryValue;
  switch (caption) {
    case anneesCaption: {
      categoryValue = getYearBDDValue(projet).toString();
      break;
    }
    case programmesCaption: {
      categoryValue = getProgrammeBDDValue(projet);
      break;
    }
    case matieresCaption: {
      categoryValue = getMaterialBDDValue(projet);
      break;
    }
    default: {
      categoryValue = '';
      break;
    }
  }
  return getBDDValueCategory(categoryValue).toString().toUpperCase() === category.toString().toUpperCase()
}
const getBDDRanking = caption => projet => {
  let categoryValue;
  switch (caption) {
    case anneesCaption: {
      categoryValue = getYearBDDValue(projet);
      break;
    }
    case programmesCaption: {
      categoryValue = getMaterialBDDValue(projet);
      break;
    }
    case matieresCaption: {
      categoryValue = getProgrammeBDDValue(projet);
      break;
    }
    default: {
      categoryValue = '';
      break;
    }
  }
  return getBDDValueRank(categoryValue)
}

const rankProjectsInBDD = (caption) => (a, b) => getBDDRanking(caption)(a) > getBDDRanking(caption)(b) ? -1 : 1

/* GATSBY-IMAGE */
const getImagePropsForGatsby = ({ node: { fluid }}) => fluid;
const getImageSrcFromImages = ({ node: { fluid: { src }}}) => src;


const getNewsDescription = news => news.description;
const getNewsHeight = news => news.images.reduce((newsHeight, { height }) => {
  return newsHeight + height + 10
}, -10);
const getNewsImageFile = image => image.file;
const getNewsDate = news => (new Date(news.date)).toLocaleString('fr', { month: 'long', year: 'numeric', day: 'numeric' })

/* GET IMAGE FLUID */


const getImageFromSrc = (images, src) => getImagePropsForGatsby(
  images
  .find(img => getImageSrcFromImages(img).includes(src))
  )

const getProjetMaterialImageForProjetsPage = (images, projet) =>
  getImageFromSrc(images, getMaterialImageSrcForProjetsPage(projet))

const getProjetMaterialImageForBDDPage = (images, projet) =>
  getImageFromSrc(images, getMaterialImageSrcForBDDPage(projet))

const getImagesForNews = (images, news) =>
  news.images.map(image => getImageFromSrc(images, getNewsImageFile(image)))

export {
  getTitle,
  getCode,
  getDescription,
  getCollab,
  getMaterial,
  getYear,
  getPrix,
  getMaterialCategory,
  getProgrammeCategory,
  isProjetInCategory,
  getBDDRanking,
  rankProjectsInBDD,
  getMaterialHeightPageProjets,
  getMaterialHeightPageBDD,
  getClassementPageProjets,
  getDeliveryDate,
  getDeliveryDisplayed,
  getEtat,
  getMission,
  getImagePropsForGatsby,
  getImageSrcFromImages,
  getImagesForNews,
  getProjetMaterialImageForProjetsPage,
  getImageFromSrc,
  getMaterialImageSrcForProjetsPage,
  getProjetMaterialImageForBDDPage,
  getLocation,
  getSurface,
  getNewsDate,
  getNewsDescription,
  getNewsImageFile,
  getNewsHeight
}