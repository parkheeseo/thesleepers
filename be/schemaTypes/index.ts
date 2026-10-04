import type { SchemaTypeDefinition } from "sanity";
import { artistAndExhibition } from "./artistandexhibition";
import { work } from "./work";
import { worksInfo } from "./worksInfo";

export const schemaTypes: SchemaTypeDefinition[] = [artistAndExhibition, worksInfo, work];
