import {AttachedBehavior, Property, Children} from 'aurelia-templating';

export class SelectedItem {
  static annotations(){
    return [
      new AttachedBehavior('selected-item'),
      new Property('value', 'valueChanged', 'selected-item').defaultBindingIsTwoWay(),
      new Children('options', 'optionsChanged', 'option')
    ];
  }

  static inject() { return [Element]; }
  constructor(element){
    this.element = element;
    this.options = [];
    this.callback = this.selectedIndexChanged.bind(this);
  }

  bind(){
    this.element.addEventListener('change', this.callback, false);
  }

  unbind(){
    this.element.removeEventListener('change', this.callback);
  }

  valueChanged(newValue){
    this.optionsChanged();
  }

  selectedIndexChanged(){
    var index = this.element.selectedIndex,
        option = this.options[index];

    this.value = option ? option.model : null;
  }

  optionsChanged(mutations){
    var value = this.value, 
        options = this.options, 
        option, i, ii;

    for(i = 0, ii = options.length; i < ii; ++i){
      option = options[i];
      
      if(option.model === value){
        if(this.element.selectedIndex !== i){
          this.element.selectedIndex = i;
        }

        return;
      }
    }

    this.element.selectedIndex = 0;
  }
}