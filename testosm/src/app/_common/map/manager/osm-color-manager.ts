import { ColorMetaData } from '../model/color-meta-data.model';

export class OSMColorManager {
  //#region Singleton
  private static _instance: OSMColorManager = null;
  private constructor() { };
  public static getInstance(): OSMColorManager {
    if (this._instance == null) {
      this._instance = new OSMColorManager();
    }
    return this._instance;
  }
  //#endregion Singleton
  getColorByCompany(name: string): ColorMetaData {
    let colorMetaData: ColorMetaData = new ColorMetaData();
    switch (name) {
      case "hisharp":
        colorMetaData = new ColorMetaData(2, 10, 200, 0.5);
        break;
      case "asa":
        colorMetaData = new ColorMetaData(2, 200, 10, 0.5);
        break;

      default:
        break;
    }
    return colorMetaData;
  }
  getDefaultFGColor(): ColorMetaData {
    let colorMetaData: ColorMetaData = new ColorMetaData();
    colorMetaData.SetDefatulFGColor();
    return colorMetaData;
  }
}
