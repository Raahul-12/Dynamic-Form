export class common {
    IsActive: string;
    CreatedOn: string;
    CreatedBY: string;
    ModifiedOn: Date;
    ModifiedBy: string
}
export class Q_Projects extends common {
    ProjectID: number;
    Name: string;
    Description: string;
}
export class Q_Answer extends common {
    Answer: string;
    Comment: string;
}

export class AddQuestionGroup extends common {
    QGID: number;
    Language: any
    GroupText: string;
    Description: string;
    SortPriority: string;
    IsDefaultExtended: string;
}
export class AddQ_project_GroupMap extends common {
    ProjectID: number;
    QGID: number;
    Language: any;
}
export class Question extends common {
    QID: number;
    QGID: number;
    Language: any;
    Question: string;
    Description: string;
    AnswerType: any;
    DefaultValue: any;
    isMandatory: string;
    SortPriority: string;

}
export class Answer extends common {
    QGID: number;
    QID: number;
    Language: any;
    ProjectID: number;
    UserID: number;
    Answer: string;
    Comment: string;

}

export class AnswerType extends common {
    AnswerType: string;
}
