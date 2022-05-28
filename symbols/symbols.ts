import { InjectionKey, Ref} from 'vue';

export const MainElKey: InjectionKey<Ref<HTMLElement>> = Symbol('MainEl');
export const HeaderElKey: InjectionKey<Ref<HTMLElement>> = Symbol('HeaderEl');