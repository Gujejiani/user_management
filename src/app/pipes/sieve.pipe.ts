import { MOUser } from './../models/user';
import { MOToSieve } from 'src/app/models/toSieve-parameters';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sievePipe',
})
export class SievePipe implements PipeTransform {
  private originalItems: MOUser[] = [];

  transform(
    items: MOUser[],
    filter: boolean,
    sort: boolean,
    sieveConfig: MOToSieve
  ): any[] {
    if (!items) {
      return [];
    }

    if (!sort && !filter && this.originalItems.length === 0) {
      this.originalItems = [...items]; // Save the original order
    }

    if ((!filter && !sort) || (!sieveConfig.hasBonus && !sieveConfig.gender)) {
      return this.originalItems.length > 0 ? this.originalItems : items;
    }

    if (filter) {
      items = this.filterItems(items, sieveConfig);
    }

    if (sort) {
      items = [...this.sortItems(items, sieveConfig)];
    }

    return items;
  }

  private filterItems(items: MOUser[], sieveConfig: MOToSieve): MOUser[] {
    const { gender, hasBonus } = sieveConfig;

    return items.filter((item) => {
      let isValid = true;

      if (gender !== null && item.gender !== gender) {
        isValid = false;
      }

      if (hasBonus && (!item.bonuses || item.bonuses.length === 0)) {
        isValid = false;
      }

      return isValid;
    });
  }

  private sortItems(items: MOUser[], sieveConfig: MOToSieve): MOUser[] {
    const { gender, hasBonus } = sieveConfig;

    return items.sort((a, b) => {
      if (gender === null && !hasBonus) {
        return 0;
      }

      // Sort by the number of bonuses if hasBonus is true and both items have bonuses
      if (hasBonus && a.bonuses && b.bonuses) {
        return b.bonuses.length - a.bonuses.length;
      }

      // Sort by gender if the number of bonuses is equal or if gender is specified and only one item has bonuses
      if (gender !== null) {
        if (a.gender === gender && (!a.bonuses || a.bonuses.length === 0)) {
          return -1;
        } else if (
          b.gender === gender &&
          (!b.bonuses || b.bonuses.length === 0)
        ) {
          return 1;
        }

        // Additional sorting by gender when bonuses are not involved
        if (a.gender === gender && b.gender !== gender) {
          return -1;
        } else if (a.gender !== gender && b.gender === gender) {
          return 1;
        }
      }

      // Default sort order
      return 0;
    });
  }
}
