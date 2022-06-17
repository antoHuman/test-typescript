export {};
class X {}

type TC1<T> = T extends object ? string : number;
