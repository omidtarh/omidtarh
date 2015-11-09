from seed.models import StatusLabel

def get_labels(user):
    """return an JSON friendly list of labels for a user in an
       owner__organization__users
       labels = [
        {
            'name': name,
            'color': color,
            'id': label_id
        },
        ...
       ]

    """
    status_labels = StatusLabel.objects.filter(
        super_organization__in=user.orgs.all()
    )
    labels = []
    for label in status_labels:
        labels.append({
            'id': label.pk,
            'name': label.name,
            'color': label.color,
        })
    return labels