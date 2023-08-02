class ObjectIdImpl {
  $oid!: string;

  public toString = (): string => `${this.$oid}`;
}

type ObjectId = ObjectIdImpl | string;
export default ObjectId;
