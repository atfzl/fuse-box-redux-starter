interface IDependants {
  [k: string]: string[];
}

function isDependantOn(
  dependants: IDependants,
  child: string,
  ancestor: string,
) {
  if (child === ancestor) {
    return true;
  }

  if (!dependants[child]) {
    return false;
  }

  for (const y of dependants[child]) {
    if (isDependantOn(dependants, y, ancestor)) {
      return true;
    }
  }

  return false;
}

export default isDependantOn;
