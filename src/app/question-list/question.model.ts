import {Answer} from "./answer.model";

export class Question{
    id!: string;
    name!: string;
	levelId!: string;
	category!: string;
	subCategory!: string;
	mark!: number;
	expectedTime!: number;
    createdAt!: Date;
	correctedAnswersId!: string[];
	createdBy!: string;
	answers!: Answer[];

}